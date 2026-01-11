-- Add locale column if missing and update uniqueness
ALTER TABLE "Section" ADD COLUMN IF NOT EXISTS "locale" TEXT NOT NULL DEFAULT 'en';

-- Drop old unique constraint on key if it exists
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

-- Add new composite unique constraint
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

-- Ensure locale default to 'en' for existing rows
UPDATE "Section" SET "locale" = 'en' WHERE "locale" IS NULL;
