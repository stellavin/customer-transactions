import { Deposits } from './deposits';
import { InMemoryDbService } from 'angular-in-memory-web-api';



export class DepositsData implements InMemoryDbService {

    createDb() {
    const deposits: Deposits[] = [
      { id: 1, bank: 'Backlays Bank', cheque: 'Q785875', amount: '0000000000', date: '2018-08-02' },
      { id: 2, bank: 'Backlays Bank', cheque: 'Q785875', amount: '1111111111' , date: '2017-09-02'  },
      { id: 3, bank: 'Backlays Bank', cheque: 'Q785875', amount: '2222222222' , date: '2016-05-02'  },
      { id: 4, bank: 'Backlays Bank', cheque: 'Q785875',  amount : '6666666666' , date: '2015-05-02' },
      { id: 5, bank: 'Backlays Bank', cheque: 'Q785875', amount: '9909999999', date: '2014-05-02'  }

    ];
    return {deposits};
  }

}
