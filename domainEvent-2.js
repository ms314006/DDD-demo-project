// Bill 的 aggregate 裡面有個 commitSuccess 負責提交成功
class Bill {
  commitSuccess() {
    // ...

    // 成功後發布通知
    domainEventPublisher.publish(
      new BillCommittedSuccess(this.id)
    );
  }
}


// 在 client 對 BillCommittedSuccess 做訂閱
domainEventPublisher.subscribe(
  BillCommittedSuccess,
  () => { /* 做後續的檢查和處理 */ },
);

const bill = billRepository.getBill(billId);
bill.commitSuccess();


// 發布事件的物件內部資訊
class BillCommittedSuccess {
  constructor(billId) {
    this.subject = BillCommittedSuccess;
    this.billId = billId;
  }
}
