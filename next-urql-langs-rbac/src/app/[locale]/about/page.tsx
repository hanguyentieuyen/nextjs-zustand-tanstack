import { createTranslation } from "@/i18n/server";

// Server component page
const aboutPage = async ({ params }: { params: { locale: string } }) => {
  console.log("aboutpage: ", params.locale);
  const { t } = await createTranslation(params.locale, "common");
  return <div>{t("about")}</div>;
};

export default aboutPage;
