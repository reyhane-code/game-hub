
interface Props {
  selectText: string;
  itemsList: any[];
  showField: string;
  onValueChange: (value: any) => void;
}

const Select: React.FC<Props> = ({ selectText, itemsList, showField, onValueChange }) => {
  return (
    <select
      onChange={(e) => onValueChange(e.target.value)}
      className="select w-full max-w-xs"
      value={selectText}
    >
      <option disabled value="">{selectText}</option>
      {itemsList.map((item, index) => (
        <option key={index} value={item[showField]}>{item[showField]}</option>
      ))}
    </select>
  );
};

export default Select;
