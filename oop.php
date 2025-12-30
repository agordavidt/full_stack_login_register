<?php

class BankAccount
{
    public $accountName;
    public $balance;

    public function deposit($amount)
    {
        if ($amount > 0) {
            $this->balance += $amount;
        }
        return $this;
    }


    public function withdraw($amount) {
        if ($amount <= $this->balance){
            $this->balance -= $amount;
            return true;
        }
        return false;
    }
}




$acc = new BankAccount();


$acc->accountName = "Lucky Dube";

$acc->balance = 0;

// method chaining
$acc->deposit(900000)
    ->deposit(700000)
    ->withdraw(50000);

// echo "The account balance is N{$acc->balance}";


// Access Modifiers : public, private and protected

class Customer
{
    private $name;

    // a setter function to set the value for the private property

    public function setName($name)
    {
        $name = trim($name);

        if ($name == '')
        {
            return false;
        }        
        $this->name = $name;
        
        return true;
    }

    public function getName()
    {
        return $this->name;
    }
}


$customer = new Customer();

$customer->setName('David Agor');

echo $customer->getName();