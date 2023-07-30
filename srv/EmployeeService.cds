using db.employee as emp from '../db/schema';

@(path:'/Employee')
service EmployeeService {
    entity Employee as projection on emp.Employee;
    entity Address as projection on emp.Address;
    entity Department as projection on emp.Department;
}
