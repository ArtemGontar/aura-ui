import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import commonStyles from "../Cards.module.css";
import styles from "./Tarot.module.css";
import { getTarotReading } from "../../../services/predictionService";
import useTelegramHaptics from "../../../hooks/useTelegramHaptic";
import LoadingDisplay from "../../LoadingDisplay/LoadingDisplay";
import TarotResult from "./TarotResult";
import Banner from "../../Banner/Banner";
import { Sparkles } from "lucide-react";
import FeatureButton from "../../FeatureButton/FeatureButton";
import { useQuotas } from "../../../hooks/useQuotas";
import { PredictionType } from "../../../types/prediction";
import tariffs from "../../../constants/tariffs";
import { FeatureType, PRODUCT_NAME_KEYS } from "../../../constants/products";
import { createInvoiceLink } from "../../../services/paymentService";
import WebApp from "@twa-dev/sdk";

const Tarot: React.FC = () => {
  const { t } = useTranslation();
  const [tarotReading, setTarotReading] = useState<any | null>(null);
  const { remainingUses, useFeature } = useQuotas(PredictionType.TarotReading);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [spreadType, setSpreadType] = useState("Three Cards");
  const { notificationOccurred } = useTelegramHaptics();

  const requestTarotReading = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTarotReading(spreadType);
      setTarotReading(data);
      useFeature();
      notificationOccurred("success");
    } catch {
      setError(t("cards.error"));
      notificationOccurred("error");
    } finally {
      setLoading(false);
    }
  };

  const requestPaidTarotReading = async () => {
    const featureId = FeatureType.TarotReading;
    const featureName = t(PRODUCT_NAME_KEYS[featureId]);
    const invoiceLink = await createInvoiceLink(featureId, featureName, t("tarot.description"), "XTR", false);
    WebApp.openInvoice(invoiceLink, async (status) => {
      if (status === 'paid') {
        await requestTarotReading();
        notificationOccurred('success');
      } else if (status === 'failed') {
        notificationOccurred('error');
      } else {
        notificationOccurred('warning');
      }
    });
  }

  return (
    <div className={commonStyles.card}>
      <Banner 
        headerText={t('tarot.banner.title')} 
        subText={t('tarot.banner.subtitle')} 
        bgColor={styles.bannerBackground}
        icon={<Sparkles className="w-8 h-8 mb-4 text-white" />} 
      />
      <div className={styles.tarotContainer}>
        {!tarotReading && !loading && (
          <>
            <div className={styles.introText}>
              <p>{t('tarot.introText')}</p>
            </div>
            <div className={styles.spreadTypeSelector}>
              <label htmlFor="spreadType" className={styles.label}>
                {t('tarot.selectSpreadType')}
              </label>
              <select
                id="spreadType"
                className={styles.select}
                value={spreadType}
                onChange={(e) => setSpreadType(e.target.value)}
              >
                <option value="Three Cards">{t('tarot.spreadTypes.threeCards')}</option>
                <option value="Celtic Cross">{t('tarot.spreadTypes.celticCross')}</option>
                <option value="Single Card">{t('tarot.spreadTypes.singleCard')}</option>
                <option value="Horseshoe">{t('tarot.spreadTypes.horseshoe')}</option>
                <option value="Love Spread">{t('tarot.spreadTypes.loveSpread')}</option>
              </select>
            </div>
          </>
        )}
        
        {!loading && !tarotReading && (
          <FeatureButton
            loading={loading}
            remainingUses={remainingUses}
            onFreeAction={requestTarotReading}
            onPaidAction={requestPaidTarotReading}
            freeActionTextKey="tarot.buttons.getReading"
            paidActionTextKey="tarot.buttons.getPaidReading"
            starsAmount={tariffs.tarotReadingStarsAmount}
          />
        )}
        
        {loading && (
          <LoadingDisplay 
            message={t('tarot.loadingMessage')} 
            size="s"
            wrapperStyle={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '100%', 
              margin: '2rem 0'
            }}
          />
        )}
        
        {error && <p className={styles.error}>{error}</p>}
        
        {!loading && tarotReading && (
          <>
            <TarotResult reading={tarotReading} />
            <button 
              className={styles.newReadingButton}
              onClick={() => setTarotReading(null)}
            >
              {t('tarot.buttons.newReading')}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Tarot;