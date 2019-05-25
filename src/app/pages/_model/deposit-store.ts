import { Deposits } from './deposits';
import { InMemoryDbService } from 'angular-in-memory-web-api';



export class DepositsData implements InMemoryDbService {

    createDb() {
    const deposits: Deposits[] = [
      { id: 1, bank: 'Pen', checkNumber: 'Q785875', amount: '0000000000', date: '12/6/2019' },
      { id: 2, bank: 'Pencil', checkNumber: 'Q785875', amount: '1111111111' , date: '12/6/2019'  },
      { id: 3, bank: 'Table', checkNumber: 'Q785875', amount: '2222222222' , date: '12/6/2019'  },
      { id: 4, bank: 'Chair', checkNumber: 'Q785875',  amount : '6666666666' , date: '12/6/2019' },
      { id: 5, bank: 'Bed', checkNumber: 'Q785875', amount: '9909999999', date: '12/6/2019'  }

    ];
    return {deposits};
  }

}
