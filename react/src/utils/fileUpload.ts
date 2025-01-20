import * as XLSX from 'xlsx';
import axios from 'axios';

interface UploadedUser {
  name?: string;
  Name?: string;
  number?: string;
  Number?: string;
  'Phone Number'?: string;
}

export const processUserFile = async (
  file: File,
  onProgress: (progress: number) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const users = XLSX.utils.sheet_to_json<UploadedUser>(worksheet);
        
        let processed = 0;
        const total = users.length;

        for (const user of users) {
          try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, {
              name: user.name || user.Name,
              number: user.number || user.Number || user['Phone Number'],
              password: `educreative${user.number || user.Number || user['Phone Number']}`
            });
            processed++;
            onProgress(Math.round((processed / total) * 100));
          } catch (error) {
            console.error(`Failed to register user ${user.name || user.Name}:`, error);
          }
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsBinaryString(file);
  });
};