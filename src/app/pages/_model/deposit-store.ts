import { Deposits, Withdrawals } from './deposits';
import { InMemoryDbService } from 'angular-in-memory-web-api';



export class DepositsData implements InMemoryDbService {

    createDb() {
    const deposits: Deposits[] = [
      { id: 1, bank: 'NIC Bank', cheque: 'Q785875', amount: 3000000000, date: '2018-08-02' },
      { id: 2, bank: 'Backlays Bank', cheque: 'Q785875', amount: 1111111111 , date: '2017-09-02'  },
      { id: 3, bank: 'KCB Bank', cheque: 'Q785875', amount: 2222222222, date: '2016-05-02'  },
      { id: 4, bank: 'Equity Bank', cheque: 'Q785875',  amount : 6666666666 , date: '2015-05-02' },
      { id: 5, bank: 'Zambia Bank', cheque: 'Q785875', amount: 9909999999, date: '2014-05-02'  }

    ];

    const withdrawals: Withdrawals[] = [
      { id: 1, bank: 'Backlays Bank',  amount: 53798, date: '2018-08-02' },
      { id: 2, bank: 'NIC Bank',  amount: 34324 , date: '2017-09-05'  },
      { id: 3, bank: 'zambia Bank', amount: 657757 , date: '2016-05-06'  },
      { id: 4, bank: 'Equity Bank',  amount : 244424 , date: '2015-05-07' },
      { id: 5, bank: 'KCB Bank',  amount: 8978968, date: '2014-05-08'  }
    ];
    return {deposits, withdrawals};
  }

}

