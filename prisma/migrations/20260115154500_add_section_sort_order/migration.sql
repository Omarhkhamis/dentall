-- Add sortOrder column to sections
ALTER TABLE "Section" ADD COLUMN IF NOT EXISTS "sortOrder" INTEGER;

-- Seed deterministic ordering based on existing keys
UPDATE "Section"
SET "sortOrder" = CASE "key"
  WHEN 'hero' THEN 0
  WHEN 'dentalImplant' THEN 1
  WHEN 'popularTreatments' THEN 2
  WHEN 'bookAppointmentPrimary' THEN 3
  WHEN 'beforeAfter' THEN 4
  WHEN 'fullWidthCampaign' THEN 5
  WHEN 'stepForm' THEN 6
  WHEN 'treatments' THEN 7
  WHEN 'bookAppointmentSecondary' THEN 8
  WHEN 'internationalPatients' THEN 9
  WHEN 'teamMembers' THEN 10
  WHEN 'clinic' THEN 11
  WHEN 'healthTourism' THEN 12
  WHEN 'luckySpin' THEN 13
  WHEN 'localAttractions' THEN 14
  WHEN 'implantMatrix' THEN 15
  WHEN 'googleReviews' THEN 16
  WHEN 'faqs' THEN 17
  ELSE 999
END
WHERE "sortOrder" IS NULL;

-- Default to 0 for new rows to avoid nulls
ALTER TABLE "Section" ALTER COLUMN "sortOrder" SET DEFAULT 0;
