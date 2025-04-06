import React from "react";
import { Button } from "@telegram-apps/telegram-ui";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface FeatureButtonProps {
  loading: boolean;
  remainingUses: number;
  onFreeAction: () => void;
  onPaidAction: () => void;
  freeActionTextKey: string;
  paidActionTextKey: string;
  starsAmount: number;
}

const FeatureButton: React.FC<FeatureButtonProps> = ({
  loading,
  remainingUses,
  onFreeAction,
  onPaidAction,
  freeActionTextKey,
  paidActionTextKey,
  starsAmount,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Button
        onClick={remainingUses > 0 ? onFreeAction : onPaidAction}
        disabled={loading}
      >
        {loading
          ? t("cards.loading")
          : remainingUses > 0
          ? t(freeActionTextKey)
          : t(paidActionTextKey, { stars: starsAmount })}
      </Button>

      {remainingUses > 0 && (
        <p className="text-sm text-gray-500 text-center">
          {t("cards.freeUsesLeft", { count: remainingUses })}
        </p>
      )}

      {remainingUses === 0 && (
        <p className="text-sm text-gray-500 text-center">
          <Link to="/tariff-plans" className="text-blue-500 underline">
            {t("cards.upgradeToPremium")}
          </Link>
        </p>
      )}
    </>
  );
};

export default FeatureButton;
