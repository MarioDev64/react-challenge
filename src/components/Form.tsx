import { useState, ChangeEvent, FormEvent } from 'react';
import { toCapitalize } from '../lib/utils';
import { setFirstName, setLastName } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

const Form: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [firstNameInput, setFirstNameInput] = useState<string>('');
  const [lastNameInput, setLastNameInput] = useState<string>('');

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstNameInput(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastNameInput(e.target.value);
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setFirstName(toCapitalize(firstNameInput)));
    dispatch(setLastName(toCapitalize(lastNameInput)));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
            <div className="form-item">
                <label htmlFor="firstName">First Name:</label>
                <input
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                value={firstNameInput}
                onChange={handleFirstNameChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="lastName">Last Name:</label>
                <input
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
                value={lastNameInput}
                onChange={handleLastNameChange}
                />
            </div>
        </div>
        
        <button type="submit">Breakify</button>
    </form>
  );
};

export default Form;
