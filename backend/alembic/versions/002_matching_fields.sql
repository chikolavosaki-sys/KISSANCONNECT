BEGIN;

ALTER TABLE farmers
ADD COLUMN IF NOT EXISTS evi_score NUMERIC(5,2),
ADD COLUMN IF NOT EXISTS evi_bucket VARCHAR(40);

ALTER TABLE applications
ADD COLUMN IF NOT EXISTS match_score NUMERIC(6,5),
ADD COLUMN IF NOT EXISTS matched_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS missing_keywords JSONB NOT NULL DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS idx_farmers_evi_bucket ON farmers(evi_bucket);
CREATE INDEX IF NOT EXISTS idx_applications_match_score ON applications(match_score);

COMMIT;
