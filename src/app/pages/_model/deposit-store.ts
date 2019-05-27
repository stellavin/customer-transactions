import { Deposits } from './deposits';
import { InMemoryDbService } from 'angular-in-memory-web-api';



export class DepositsData implements InMemoryDbService {

    createDb() {
    const deposits: Deposits[] = [
      { id: 1, bank: 'Zambia Bank', type: 'Deposit', amount: 30000, date: '2019-01-02' },
      { id: 2, bank: 'Zambia Bank', type: 'Deposit', amount: 40000 , date: '2019-01-03'  },
      { id: 3, bank: 'Zambia Bank', type: 'Deposit', amount: 100000, date: '2019-04-04'  },
      { id: 4, bank: 'Zambia Bank', type: 'Withdrawal',  amount : 30000 , date: '2019-04-06' },
      { id: 5, bank: 'Zambia Bank', type: 'Withdrawal', amount: 10000, date: '2014-05-02'  }
    ];
    return {deposits};
  }

}

