import getpass
from sqlalchemy import select

from app.core.database import SessionLocal
from app.core.security import hash_password

from app.models.farmer import Farmer
from app.models.user import User


def main():
    phone = input("Admin phone: ").strip()
    password = getpass.getpass("Admin password: ")
    role = input("Role [super_admin]: ").strip() or "super_admin"

    if role not in {"district_admin", "state_admin", "super_admin"}:
        raise ValueError("Invalid admin role")

    db = SessionLocal()

    try:
        existing = db.scalar(
            select(User).where(User.phone == phone)
        )

        if existing:
            raise ValueError("A user with this phone already exists")

        user = User(
            phone=phone,
            password_hash=hash_password(password),
            role=role,
            is_active=True,
            farmer_id=None,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        print(f"Created {role}: user_id={user.user_id}")

    finally:
        db.close()


if __name__ == "__main__":
    main()