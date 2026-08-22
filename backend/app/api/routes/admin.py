from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select, case
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.core.database import get_db
from app.models.user import User
from app.models.state import State
from app.models.district import District
from app.models.farmer import Farmer
from app.models.scheme import Scheme
from app.models.application import Application
from app.models.bookmark import Bookmark

router = APIRouter(prefix="/admin", tags=["Admin"])

ADMIN_ROLES = ("district_admin", "state_admin", "super_admin")

def admin_user():
    return require_roles(*ADMIN_ROLES)

@router.get("/overview")
def overview(
    _: User = Depends(admin_user()),
    db: Session = Depends(get_db),
):
    total_farmers = db.scalar(select(func.count(Farmer.farmer_id))) or 0
    total_users = db.scalar(select(func.count(User.user_id))) or 0
    registered_farmers = db.scalar(
        select(func.count(Farmer.farmer_id))
        .join(User, User.farmer_id == Farmer.farmer_id)
    ) or 0
    total_states = db.scalar(select(func.count(State.state_id))) or 0
    total_districts = db.scalar(select(func.count(District.district_id))) or 0
    total_schemes = db.scalar(select(func.count(Scheme.scheme_id))) or 0
    total_applications = db.scalar(select(func.count(Application.application_id))) or 0
    total_bookmarks = db.scalar(select(func.count(Bookmark.bookmark_id))) or 0

    status_rows = db.execute(
        select(Application.status, func.count(Application.application_id))
        .group_by(Application.status)
        .order_by(Application.status)
    ).all()

    evi_rows = db.execute(
        select(Farmer.evi_bucket, func.count(Farmer.farmer_id))
        .where(Farmer.evi_bucket.is_not(None))
        .group_by(Farmer.evi_bucket)
        .order_by(Farmer.evi_bucket)
    ).all()

    return {
        "geography": {
            "states": total_states,
            "districts": total_districts,
        },
        "farmers": {
            "total": total_farmers,
            "registered": registered_farmers,
            "unregistered": max(total_farmers - registered_farmers, 0),
        },
        "schemes": {
            "total": total_schemes,
        },
        "activity": {
            "applications": total_applications,
            "bookmarks": total_bookmarks,
            "applications_by_status": {
                str(status): count for status, count in status_rows
            },
        },
        "evi_distribution": {
            str(bucket): count for bucket, count in evi_rows
        },
    }

@router.get("/states")
def state_analytics(
    _: User = Depends(admin_user()),
    db: Session = Depends(get_db),
):
    states = db.scalars(select(State).order_by(State.state_name)).all()
    result = []

    for state in states:
        farmer_count = db.scalar(
            select(func.count(Farmer.farmer_id))
            .where(Farmer.state_id == state.state_id)
        ) or 0

        registered_count = db.scalar(
            select(func.count(User.user_id))
            .join(Farmer, User.farmer_id == Farmer.farmer_id)
            .where(Farmer.state_id == state.state_id)
        ) or 0

        district_count = db.scalar(
            select(func.count(District.district_id))
            .where(District.state_id == state.state_id)
        ) or 0

        application_count = db.scalar(
            select(func.count(Application.application_id))
            .join(Farmer, Application.farmer_id == Farmer.farmer_id)
            .where(Farmer.state_id == state.state_id)
        ) or 0

        result.append({
            "state_id": state.state_id,
            "state_code": state.state_code,
            "state_name": state.state_name,
            "district_count": district_count,
            "farmer_count": farmer_count,
            "registered_farmer_count": registered_count,
            "application_count": application_count,
        })

    return result

@router.get("/states/{state_id}")
def state_detail(
    state_id: int,
    _: User = Depends(admin_user()),
    db: Session = Depends(get_db),
):
    state = db.get(State, state_id)
    if not state:
        raise HTTPException(status_code=404, detail="State not found")

    farmer_count = db.scalar(
        select(func.count(Farmer.farmer_id))
        .where(Farmer.state_id == state_id)
    ) or 0

    registered_count = db.scalar(
        select(func.count(User.user_id))
        .join(Farmer, User.farmer_id == Farmer.farmer_id)
        .where(Farmer.state_id == state_id)
    ) or 0

    application_count = db.scalar(
        select(func.count(Application.application_id))
        .join(Farmer, Application.farmer_id == Farmer.farmer_id)
        .where(Farmer.state_id == state_id)
    ) or 0

    evi_rows = db.execute(
        select(Farmer.evi_bucket, func.count(Farmer.farmer_id))
        .where(
            Farmer.state_id == state_id,
            Farmer.evi_bucket.is_not(None),
        )
        .group_by(Farmer.evi_bucket)
    ).all()

    crop_rows = db.execute(
        select(Farmer.primary_crop, func.count(Farmer.farmer_id))
        .where(
            Farmer.state_id == state_id,
            Farmer.primary_crop.is_not(None),
        )
        .group_by(Farmer.primary_crop)
        .order_by(func.count(Farmer.farmer_id).desc())
        .limit(10)
    ).all()

    return {
        "state": {
            "state_id": state.state_id,
            "state_code": state.state_code,
            "state_name": state.state_name,
        },
        "metrics": {
            "farmers": farmer_count,
            "registered_farmers": registered_count,
            "applications": application_count,
        },
        "evi_distribution": {
            str(bucket): count for bucket, count in evi_rows
        },
        "top_primary_crops": [
            {"crop": crop, "farmer_count": count}
            for crop, count in crop_rows
        ],
    }

@router.get("/states/{state_id}/districts")
def state_districts(
    state_id: int,
    _: User = Depends(admin_user()),
    db: Session = Depends(get_db),
):
    if not db.get(State, state_id):
        raise HTTPException(status_code=404, detail="State not found")

    districts = db.scalars(
        select(District)
        .where(District.state_id == state_id)
        .order_by(District.district_name)
    ).all()

    result = []
    for district in districts:
        farmer_count = db.scalar(
            select(func.count(Farmer.farmer_id))
            .where(Farmer.district_id == district.district_id)
        ) or 0

        registered_count = db.scalar(
            select(func.count(User.user_id))
            .join(Farmer, User.farmer_id == Farmer.farmer_id)
            .where(Farmer.district_id == district.district_id)
        ) or 0

        application_count = db.scalar(
            select(func.count(Application.application_id))
            .join(Farmer, Application.farmer_id == Farmer.farmer_id)
            .where(Farmer.district_id == district.district_id)
        ) or 0

        result.append({
            "district_id": district.district_id,
            "district_code": district.district_code,
            "district_name": district.district_name,
            "farmer_count": farmer_count,
            "registered_farmer_count": registered_count,
            "application_count": application_count,
            "agro_climatic_zone": district.agro_climatic_zone,
            "drought_prone_flag": district.drought_prone_flag,
            "flood_prone_flag": district.flood_prone_flag,
            "aspirational_district_flag": district.aspirational_district_flag,
        })

    return result

@router.get("/districts/{district_id}")
def district_detail(
    district_id: int,
    _: User = Depends(admin_user()),
    db: Session = Depends(get_db),
):
    district = db.get(District, district_id)
    if not district:
        raise HTTPException(status_code=404, detail="District not found")

    farmer_count = db.scalar(
        select(func.count(Farmer.farmer_id))
        .where(Farmer.district_id == district_id)
    ) or 0

    registered_count = db.scalar(
        select(func.count(User.user_id))
        .join(Farmer, User.farmer_id == Farmer.farmer_id)
        .where(Farmer.district_id == district_id)
    ) or 0

    application_count = db.scalar(
        select(func.count(Application.application_id))
        .join(Farmer, Application.farmer_id == Farmer.farmer_id)
        .where(Farmer.district_id == district_id)
    ) or 0

    gender_rows = db.execute(
        select(Farmer.gender, func.count(Farmer.farmer_id))
        .where(
            Farmer.district_id == district_id,
            Farmer.gender.is_not(None),
        )
        .group_by(Farmer.gender)
        .order_by(func.count(Farmer.farmer_id).desc())
    ).all()

    category_rows = db.execute(
        select(Farmer.social_category, func.count(Farmer.farmer_id))
        .where(
            Farmer.district_id == district_id,
            Farmer.social_category.is_not(None),
        )
        .group_by(Farmer.social_category)
        .order_by(func.count(Farmer.farmer_id).desc())
    ).all()

    evi_rows = db.execute(
        select(Farmer.evi_bucket, func.count(Farmer.farmer_id))
        .where(
            Farmer.district_id == district_id,
            Farmer.evi_bucket.is_not(None),
        )
        .group_by(Farmer.evi_bucket)
    ).all()

    crop_rows = db.execute(
        select(Farmer.primary_crop, func.count(Farmer.farmer_id))
        .where(
            Farmer.district_id == district_id,
            Farmer.primary_crop.is_not(None),
        )
        .group_by(Farmer.primary_crop)
        .order_by(func.count(Farmer.farmer_id).desc())
        .limit(10)
    ).all()

    scheme_rows = db.execute(
        select(
            Scheme.scheme_id,
            Scheme.scheme_name,
            func.count(Application.application_id).label("application_count"),
        )
        .join(Application, Application.scheme_id == Scheme.scheme_id)
        .join(Farmer, Application.farmer_id == Farmer.farmer_id)
        .where(Farmer.district_id == district_id)
        .group_by(Scheme.scheme_id, Scheme.scheme_name)
        .order_by(func.count(Application.application_id).desc())
        .limit(10)
    ).all()

    return {
        "district": {
            "district_id": district.district_id,
            "district_code": district.district_code,
            "district_name": district.district_name,
            "state_id": district.state_id,
            "agro_climatic_zone": district.agro_climatic_zone,
            "drought_prone_flag": district.drought_prone_flag,
            "flood_prone_flag": district.flood_prone_flag,
            "aspirational_district_flag": district.aspirational_district_flag,
        },
        "metrics": {
            "farmers": farmer_count,
            "registered_farmers": registered_count,
            "applications": application_count,
        },
        "gender_distribution": {
            str(gender): count for gender, count in gender_rows
        },
        "category_distribution": {
            str(category): count for category, count in category_rows
        },
        "evi_distribution": {
            str(bucket): count for bucket, count in evi_rows
        },
        "top_primary_crops": [
            {"crop": crop, "farmer_count": count}
            for crop, count in crop_rows
        ],
        "top_schemes_by_applications": [
            {
                "scheme_id": scheme_id,
                "scheme_name": scheme_name,
                "application_count": count,
            }
            for scheme_id, scheme_name, count in scheme_rows
        ],
    }

@router.get("/farmers")
def farmer_search(
    state_id: int | None = None,
    district_id: int | None = None,
    gender: str | None = None,
    category: str | None = None,
    evi_bucket: str | None = None,
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
    _: User = Depends(admin_user()),
    db: Session = Depends(get_db),
):
    conditions = []
    if state_id is not None:
        conditions.append(Farmer.state_id == state_id)
    if district_id is not None:
        conditions.append(Farmer.district_id == district_id)
    if gender:
        conditions.append(Farmer.gender.ilike(gender))
    if category:
        conditions.append(Farmer.social_category.ilike(category))
    if evi_bucket:
        conditions.append(Farmer.evi_bucket.ilike(evi_bucket))

    stmt = (
        select(
            Farmer.farmer_id,
            Farmer.source_farmer_id,
            Farmer.full_name,
            Farmer.age,
            Farmer.gender,
            Farmer.social_category,
            Farmer.state_id,
            Farmer.district_id,
            Farmer.primary_crop,
            Farmer.land_owned_acres,
            Farmer.evi_score,
            Farmer.evi_bucket,
        )
        .where(*conditions)
        .order_by(Farmer.farmer_id)
        .offset(offset)
        .limit(limit)
    )

    rows = db.execute(stmt).all()
    total_stmt = select(func.count(Farmer.farmer_id)).where(*conditions)
    total = db.scalar(total_stmt) or 0

    return {
        "total": total,
        "limit": limit,
        "offset": offset,
        "items": [dict(row._mapping) for row in rows],
    }

@router.get("/applications")
def application_analytics(
    state_id: int | None = None,
    district_id: int | None = None,
    status: str | None = None,
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    _: User = Depends(admin_user()),
    db: Session = Depends(get_db),
):
    conditions = []
    if state_id is not None:
        conditions.append(Farmer.state_id == state_id)
    if district_id is not None:
        conditions.append(Farmer.district_id == district_id)
    if status:
        conditions.append(Application.status == status)

    stmt = (
        select(
            Application.application_id,
            Application.farmer_id,
            Application.scheme_id,
            Scheme.scheme_name,
            Application.status,
            Application.match_score,
            Application.created_at,
            Application.submitted_at,
        )
        .join(Farmer, Application.farmer_id == Farmer.farmer_id)
        .join(Scheme, Application.scheme_id == Scheme.scheme_id)
        .where(*conditions)
        .order_by(Application.application_id.desc())
        .offset(offset)
        .limit(limit)
    )

    rows = db.execute(stmt).all()
    total = db.scalar(
        select(func.count(Application.application_id))
        .join(Farmer, Application.farmer_id == Farmer.farmer_id)
        .where(*conditions)
    ) or 0

    return {
        "total": total,
        "limit": limit,
        "offset": offset,
        "items": [dict(row._mapping) for row in rows],
    }

@router.get("/schemes")
def scheme_analytics(
    _: User = Depends(admin_user()),
    db: Session = Depends(get_db),
):
    rows = db.execute(
        select(
            Scheme.scheme_id,
            Scheme.scheme_name,
            Scheme.level,
            Scheme.applicable_state,
            func.count(Application.application_id).label("application_count"),
            func.count(Bookmark.bookmark_id).label("bookmark_count"),
        )
        .outerjoin(Application, Application.scheme_id == Scheme.scheme_id)
        .outerjoin(Bookmark, Bookmark.scheme_id == Scheme.scheme_id)
        .group_by(
            Scheme.scheme_id,
            Scheme.scheme_name,
            Scheme.level,
            Scheme.applicable_state,
        )
        .order_by(func.count(Application.application_id).desc())
    ).all()

    # The two outer joins can multiply rows when both applications and bookmarks
    # exist. Recompute counts independently for exact dashboard values.
    result = []
    for scheme_id, scheme_name, level, applicable_state, _, _ in rows:
        application_count = db.scalar(
            select(func.count(Application.application_id))
            .where(Application.scheme_id == scheme_id)
        ) or 0
        bookmark_count = db.scalar(
            select(func.count(Bookmark.bookmark_id))
            .where(Bookmark.scheme_id == scheme_id)
        ) or 0
        result.append({
            "scheme_id": scheme_id,
            "scheme_name": scheme_name,
            "level": level,
            "applicable_state": applicable_state,
            "application_count": application_count,
            "bookmark_count": bookmark_count,
        })
    result.sort(key=lambda x: x["application_count"], reverse=True)
    return result
