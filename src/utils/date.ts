const DATE_PARTS_PATTERN = /^(\d{4})[\/.-](\d{1,2})[\/.-](\d{1,2})$/;

export const formatJapaneseDate = (dateValue: string | Date): string => {
  if (dateValue instanceof Date) {
    if (Number.isNaN(dateValue.valueOf())) return "";
    return `${dateValue.getFullYear()}年${dateValue.getMonth() + 1}月${dateValue.getDate()}日`;
  }

  const trimmed = dateValue.trim();
  const match = DATE_PARTS_PATTERN.exec(trimmed);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    return `${year}年${month}月${day}日`;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.valueOf())) return trimmed;
  return `${parsed.getFullYear()}年${parsed.getMonth() + 1}月${parsed.getDate()}日`;
};
