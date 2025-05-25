import { useCallback } from "react"; // Added useCallback
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";
import { HomeProps } from "../../types";
import { HOME_CARDS } from "../../constants/cards";
import { useUserData } from "../../hooks/useUserData";
import { useRandomWelcomeMessage } from "../../hooks/useRandomWelcomeMessage";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import LoadingDisplay from "../LoadingDisplay/LoadingDisplay";
import HomeHeader from "./HomeHeader";
import HomeCardsGrid from "./HomeCardsGrid"; // Added import

const Home: React.FC<HomeProps> = ({ className }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isUserLoading, isStatsLoading, error, userData, userStats } = useUserData();
  const randomWelcomeMessage = useRandomWelcomeMessage(t);

  const handleNavigation = useCallback((path: string, disabled: boolean) => {
    if (!disabled) {
      navigate(path);
    }
  }, [navigate]); // Wrapped with useCallback

  if (error) {
    return <ErrorDisplay error={error}></ErrorDisplay>;
  }

  if (!userData && !isUserLoading) {
    return <ErrorDisplay error={t('error.noUserData')}></ErrorDisplay>;
  }

  if (isUserLoading && !userData) {
    return <LoadingDisplay />;
  }

  return (
    <div className={`${styles.home} ${className || ''}`}>
      <HomeHeader
        userName={userData?.firstName}
        streak={userStats?.streak}
        coinBalance={userStats?.coinBalance}
        welcomeMessage={randomWelcomeMessage}
        isStatsLoading={isStatsLoading}
        t={t}
      />
      <HomeCardsGrid
        cards={HOME_CARDS}
        onCardClick={handleNavigation}
        t={t}
      />
    </div>
  );
};

export default Home;