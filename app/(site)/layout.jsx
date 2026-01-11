import CustomHeadSnippet from "../components/CustomHeadSnippet";
import { getCustomHeader } from "../../lib/customHeader";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }) {
  const customHeader = await getCustomHeader();

  return (
    <>
      <CustomHeadSnippet html={customHeader?.content} />
      {children}
      {customHeader?.bodyContent ? (
        <div dangerouslySetInnerHTML={{ __html: customHeader.bodyContent }} />
      ) : null}
    </>
  );
}
