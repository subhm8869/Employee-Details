namespace db.employee;

entity Employee {
  key ID : UUID;
  Name : String(15);
  Age : Int16;
  Gender : String(1);
  Phone: Int64;
  Address : Composition of many Address on Address.Employee = $self;
  Department : Association to Department;
}

entity Address {
  key ID : UUID;
  AddressLine : String(100);
  Pincode : Int32;
  Employee : Association to Employee;
}

entity Department {
  key ID : UUID;
  Name : String(15);
  HeadCount : Int16;
  Employee : Association to many Employee on Employee.Department = $self;
}

