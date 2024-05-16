import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { periodicElements } from '../data/periodicElements';
import { toCapitalize } from '../lib/utils';

const Breakify: React.FC = () => {
    const firstName = useSelector((state: RootState) => state.user.firstName);
    const lastName = useSelector((state: RootState) => state.user.lastName);

    const findLongestElement = (name: string): string => {
      const elements = Object.keys(periodicElements);
      let longestElement = '';
  
      // Buscar las primeras dos letras del nombre
      const firstTwoLetters = toCapitalize(name.slice(0, 2));
  
      // Iterar sobre los elementos de la tabla periódica
      for (const element of elements) {
        // Verificar si el elemento contiene las primeras dos letras del nombre
        if (element.startsWith(firstTwoLetters)) {
          // Verificar si es la abreviatura más larga encontrada hasta ahora
          if (element.length > longestElement.length) {
            longestElement = element;
          }
        }
      }
  
      return longestElement;
    };
  
    const highlightElement = (name: string): React.ReactNode => {
      const longestElement = findLongestElement(name);
  
      // Si no se encontró ninguna abreviatura válida, retornar el nombre original
      if (!longestElement) {
        return name;
      }
  
      // Crear una expresión regular para resaltar la abreviatura encontrada
      const regex = new RegExp(`(${longestElement})`, 'gi');
  
      // Dividir el nombre en partes y resaltar la abreviatura encontrada
      return name.split(regex).map((part, index) =>
        periodicElements[toCapitalize(part)] ? (
          <span key={index} className="highlight">
            {part}
          </span>
        ) : (
          part
        )
      );
    };
  

    return (
        <div className='breakify'>
            <h2>{highlightElement(firstName)}</h2>
            <h2>{highlightElement(lastName)}</h2>
        </div>
    );
};

export default Breakify;

