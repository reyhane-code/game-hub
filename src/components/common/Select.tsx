interface Props {
  selectText: string;
  itemsList: any[];
  showField: string;
  onValueChange: (value: any) => void;
}

function Select({ selectText, itemsList, showField, onValueChange }: Props) {
  return (
    <select
      onChange={onValueChange}
      className="select w-full max-w-xs"
      defaultValue={selectText}
    >
      <option disabled>{selectText}</option>
      {itemsList.map((item, index) => (
        <option key={index}>{item[showField]}</option>
      ))}
    </select>
  );
}

export default Select;
