import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import commonStyles from "../Cards.module.css";
import styles from './HandFortune.module.css';
import { getHandFortune } from '../../../services/predictionService';
import useTelegramHaptics from '../../../hooks/useTelegramHaptic';
import LoadingDisplay from '../../LoadingDisplay/LoadingDisplay';
import HandFortuneResult from './HandFortuneResult';
import Banner from '../../Banner/Banner';
import { Hand } from 'lucide-react';
import FeatureButton from '../../FeatureButton/FeatureButton';
import { useQuotas } from '../../../hooks/useQuotas';
import { PredictionType } from '../../../types/prediction';
import tariffs from "../../../constants/tariffs";
import { FeatureType, PRODUCT_NAME_KEYS } from '../../../constants/products';
import { createInvoiceLink } from '../../../services/paymentService';
import WebApp from '@twa-dev/sdk';

const HandFortune: React.FC = () => {
  const { t } = useTranslation();
  const [handImage, setHandImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [reading, setReading] = useState<any | null>(null);
  const { remainingUses, useFeature } = useQuotas(PredictionType.HandFortune);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { notificationOccurred } = useTelegramHaptics();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setHandImage(file);
      setImagePreview(URL.createObjectURL(file));
      notificationOccurred("success");
    }
  };

  const takePicture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const openTelegramCamera = () => {
    WebApp.showPopup({
      title: t('handFortune.selectOption'),
      message: t('handFortune.chooseImageSource'),
      buttons: [
        {
          id: "camera",
          type: "default",
          text: t('handFortune.camera')
        }
      ]
    }, (buttonId) => {
      if (buttonId === "camera") {
        takePicture();
      }
    });
  };

  const requestHandFortune = async () => {
    if (!handImage) {
      setError(t("handFortune.noImageError"));
      notificationOccurred("error");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await getHandFortune(handImage);
      setReading(data);
      useFeature();
      notificationOccurred("success");
    } catch {
      setError(t("cards.error"));
      notificationOccurred("error");
    } finally {
      setLoading(false);
    }
  };

  const requestPaidHandFortune = async () => {
    if (!handImage) {
      setError(t("handFortune.noImageError"));
      notificationOccurred("error");
      return;
    }

    const featureId = FeatureType.HandFortune;
    const featureName = t(PRODUCT_NAME_KEYS[featureId]);
    const invoiceLink = await createInvoiceLink(featureId, featureName, t("handFortune.description"), "XTR", false);
    WebApp.openInvoice(invoiceLink, async (status) => {
      if (status === 'paid') {
        await requestHandFortune();
        notificationOccurred('success');
      } else if (status === 'failed') {
        notificationOccurred('error');
      } else {
        notificationOccurred('warning');
      }
    });
  };

  const resetHandFortune = () => {
    setHandImage(null);
    setImagePreview(null);
    setReading(null);
  };

  return (
    <div className={commonStyles.card}>
      <Banner 
        headerText={t('handFortune.banner.title')} 
        subText={t('handFortune.banner.subtitle')} 
        bgColor={styles.bannerBackground}
        icon={<Hand className="w-8 h-8 mb-4 text-white" />} 
      />
      <div className={styles.handFortuneContainer}>
        {!reading && !loading && (
          <>
            <div className={styles.introText}>
              <p>{t('handFortune.introText')}</p>
            </div>
            
            <input 
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.hiddenInput}
              ref={fileInputRef}
            />
            
            <button 
              className={styles.uploadButton}
              onClick={openTelegramCamera}
            >
              {handImage ? t('handFortune.changeImage') : t('handFortune.uploadImage')}
            </button>

            {imagePreview && (
              <div className={styles.imagePreviewContainer}>
                <img 
                  src={imagePreview} 
                  alt={t('handFortune.handPreview')}
                  className={styles.imagePreview} 
                />
                <button 
                  className={styles.removeImageButton}
                  onClick={resetHandFortune}
                >
                  {t('handFortune.removeImage')}
                </button>
              </div>
            )}

            {handImage && (
              <FeatureButton
                loading={loading}
                remainingUses={remainingUses}
                onFreeAction={requestHandFortune}
                onPaidAction={requestPaidHandFortune}
                freeActionTextKey="handFortune.buttons.getReading"
                paidActionTextKey="handFortune.buttons.getPaidReading"
                starsAmount={tariffs.handFortuneStarsAmount || 10}
              />
            )}
          </>
        )}
        
        {loading && (
          <LoadingDisplay 
            message={t('handFortune.loadingMessage')} 
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
        
        {!loading && reading && (
          <>
            <HandFortuneResult reading={reading} />
            <button 
              className={styles.newReadingButton}
              onClick={resetHandFortune}
            >
              {t('handFortune.buttons.newReading')}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HandFortune;
