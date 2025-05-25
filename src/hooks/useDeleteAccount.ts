import { useState, useCallback } from 'react';
import { TFunction } from 'i18next';
import WebApp from '@twa-dev/sdk';
import { deleteUser } from '../services/userService';

interface UseDeleteAccountArgs {
  userId: number | undefined; // Allow undefined initially if userData is not yet available
  t: TFunction;
}

interface UseDeleteAccountReturn {
  confirmAndDeleteAccount: () => void;
  isDeleting: boolean;
  deleteError: string | null;
}

export const useDeleteAccount = ({ userId, t }: UseDeleteAccountArgs): UseDeleteAccountReturn => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const confirmAndDeleteAccount = useCallback(async () => {
    if (!userId) {
      setDeleteError(t('profile.errors.userIdMissing', 'User ID is missing, cannot delete account.'));
      return;
    }

    WebApp.showConfirm(t('profile.confirmDelete', 'Are you sure you want to delete your account? This action cannot be undone.'), async (confirmed) => {
      if (confirmed) {
        setIsDeleting(true);
        setDeleteError(null);
        try {
          await deleteUser(userId);
          // Successfully deleted
          WebApp.close(); // Close the Mini App as per original logic
        } catch (error) {
          console.error("Error deleting account:", error);
          const errorMessage = t('profile.deleteError', 'Failed to delete account. Please try again.');
          setDeleteError(errorMessage);
          // Optionally, show an alert here if the component isn't expected to display the error
          // WebApp.showAlert(errorMessage); 
        } finally {
          setIsDeleting(false);
        }
      }
    });
  }, [userId, t]);

  return { confirmAndDeleteAccount, isDeleting, deleteError };
};
