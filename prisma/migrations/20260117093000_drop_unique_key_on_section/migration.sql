-- Ensure locale column exists
ALTER TABLE "Section" ADD COLUMN IF NOT EXISTS "locale" TEXT NOT NULL DEFAULT 'en';

-- Drop any old unique constraint/index on key only
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    WHERE t.relname = 'Section' AND c.conname = 'Section_key_key'
  ) THEN
    ALTER TABLE "Section" DROP CONSTRAINT "Section_key_key";
  END IF;
END $$;

DROP INDEX IF EXISTS "Section_key_key";

-- Recreate composite unique if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    WHERE t.relname = 'Section' AND c.conname = 'Section_key_locale_key'
  ) THEN
    ALTER TABLE "Section" ADD CONSTRAINT "Section_key_locale_key" UNIQUE ("key", "locale");
  END IF;
END $$;
