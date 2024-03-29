import { useTranslation } from 'react-i18next';

export const useTranslationT = () => {
    const { t } = useTranslation();
    return t
}