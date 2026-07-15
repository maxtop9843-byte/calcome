const VALID_GROUPED_MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)$/;

export function formatMoneyInput(value: string, previousValue = ""): string {
  if (value === "") return "";
  if (!/^[\d,]+$/.test(value)) return value;

  const digits = value.replaceAll(",", "");
  const previousDigits = previousValue.replaceAll(",", "");
  const isContinuousEdit =
    VALID_GROUPED_MONEY.test(previousValue) &&
    Math.abs(digits.length - previousDigits.length) <= 1;

  if (
    value.includes(",") &&
    !VALID_GROUPED_MONEY.test(value) &&
    !isContinuousEdit
  )
    return value;

  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isValidMoneyInput(value: string): boolean {
  return VALID_GROUPED_MONEY.test(value);
}
