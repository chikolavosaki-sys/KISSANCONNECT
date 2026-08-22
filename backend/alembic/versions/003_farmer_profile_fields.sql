BEGIN;

ALTER TABLE farmers
    ADD COLUMN IF NOT EXISTS address_line TEXT,
    ADD COLUMN IF NOT EXISTS village VARCHAR(150),
    ADD COLUMN IF NOT EXISTS block VARCHAR(150),
    ADD COLUMN IF NOT EXISTS occupation VARCHAR(150),
    ADD COLUMN IF NOT EXISTS annual_income_inr NUMERIC(18,2);

CREATE INDEX IF NOT EXISTS idx_farmers_village ON farmers(village);
CREATE INDEX IF NOT EXISTS idx_farmers_occupation ON farmers(occupation);

COMMIT;
