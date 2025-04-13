import React, { useState } from "react";
import styles from "./Task.module.css";
import coin from "../../assets/coin.png";
import { TaskStatus, TaskType } from "../../types/task";

interface TaskProps {
  id: number;
  name: string;
  bonuses: number;
  link: string;
  type: TaskType;
  status: TaskStatus;
  onVerify: (taskId: number) => Promise<boolean>;
  onComplete: (taskId: number) => void;
}

const Task: React.FC<TaskProps> = ({ 
  id, 
  name, 
  bonuses, 
  link, 
  type, 
  status, 
  onVerify,
  onComplete 
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const handleVisit = () => {
    if (link) {
      if (link.startsWith('/')) {
        // For in-app tasks, mark as completed when navigating
        if (type === "in-app" && status === "incomplete") {
          onComplete(id);
        }
        window.location.href = link;
      } else {
        window.open(link, "_blank");
      }
    }
  };

  const handleVerify = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationError(null);
    
    try {
      const verified = await onVerify(id);
      if (verified) {
        onComplete(id);
      } else {
        setVerificationError("Verification failed. Please make sure you've completed the task.");
      }
    } catch (error) {
      setVerificationError("Error during verification. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={`${styles.task} ${status === "completed" ? styles.completed : ""}`}>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.bonuses}>
          +{bonuses} <img src={coin} alt="Aura coin" className={styles.coinImg} />
        </p>
      </div>
      
      <div className={styles.actions}>
        {status === "completed" ? (
          <span className={styles.completedBadge}>✓ Completed</span>
        ) : (
          <>
            <button 
              className={styles.visitBtn} 
              onClick={handleVisit}
              disabled={isVerifying}
            >
              Visit
            </button>
            <button 
              className={`${styles.verifyBtn} ${isVerifying ? styles.loading : ''}`}
              onClick={handleVerify} 
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <span className={styles.spinnerIcon}></span>
                  Checking...
                </>
              ) : "Verify"}
            </button>
          </>
        )}
      </div>
      
      {verificationError && (
        <div className={styles.errorMessage}>{verificationError}</div>
      )}
    </div>
  );
};

export default Task;
