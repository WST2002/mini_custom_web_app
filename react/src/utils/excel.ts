import * as XLSX from 'xlsx';
import { User } from '../pages/owner/components/index';

interface UserExportData {
  'User ID': number;
  'Name': string;
  'Phone Number': string;
  'Plan': string;
  'Plan Updated': string;
}

const COLUMN_WIDTHS = [
  { wch: 10 }, // User ID
  { wch: 20 }, // Name
  { wch: 15 }, // Phone Number
  { wch: 10 }, // Plan
  { wch: 15 }, // Plan Updated
];

export const exportUsersToExcel = (users: User[]): void => {
  const data: UserExportData[] = users.map(user => ({
    'User ID': user.userId,
    'Name': user.name,
    'Phone Number': user.number,
    'Plan': user.plan,
    'Plan Updated': user.planUpdatedAt ? new Date(user.planUpdatedAt).toLocaleDateString() : ''
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  ws['!cols'] = COLUMN_WIDTHS;
  
  XLSX.utils.book_append_sheet(wb, ws, 'Users');
  XLSX.writeFile(wb, 'users-data.xlsx');
};