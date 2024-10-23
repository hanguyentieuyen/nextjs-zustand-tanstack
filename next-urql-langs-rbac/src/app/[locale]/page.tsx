// Test translate languages on server component

import { createTranslation } from "@/i18n/server";

// async can be use on server page
const localePage = async ({ params }: { params: { locale: string } }) => {
  const { t } = await createTranslation(params.locale, "common");
  return (
    <div>
      <h1>{t("home")}</h1>
    </div>
  );
};
export default localePage;
