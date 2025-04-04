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
  startAmount: number;
}

const FeatureButton: React.FC<FeatureButtonProps> = ({
  loading,
  remainingUses,
  onFreeAction,
  onPaidAction,
  freeActionTextKey,
  paidActionTextKey,
  startAmount,
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
          : t(paidActionTextKey, { stars: startAmount })}
      </Button>

      {remainingUses > 0 && (
        <p className="text-sm text-gray-500">
          {t("cards.freeUsesLeft", { count: remainingUses })}
        </p>
      )}

      {remainingUses === 0 && (
        <p className="text-sm text-gray-500">
          <Link to="/tariff-plans" className="text-blue-500 underline">
            {t("cards.upgradeToPremium")}
          </Link>
        </p>
      )}
    </>
  );
};

export default FeatureButton;
