import { format as f } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function format(date: string) {
  return f(new Date(date), 'dd MMM yyyy', {
    locale: ptBR,
  });
}
