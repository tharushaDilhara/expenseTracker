import React, { useState } from 'react'
import './ExpenseTrackingApp.css'

const ExpenseTrackingApp = () => {

    const[expense,setExpense] = useState([
                                {
                                    title:"",
                                    amount: '',
                                    type: ""
                                },                //
                            ]);

    const[newexpense,setNewExpence] = useState([]);
    const[totalincome,setTotalincome] = useState(0);
    const[totalexpenses,setTotalExpenses] = useState(0);
    const[balance,setBalance] = useState(0);

    function handleOnChange(e){
       setExpense((previousExpense)=>({
        ...previousExpense,                  //
        [e.target.name]:e.target.value,
       }))
       console.log(expense);
       
    }

    function handleSubmit(e){ 

        e.preventDefault(); //prevent page reloading
        if(!(expense.title && expense.amount) ){   //
            alert("fill the all blanks");
            return 0;
            
        }
        if(!(expense.type==="Income" || expense.type==="Expense") ){
            alert("Select expense type");
            return 0;
            
        }
        
        setNewExpence((previousExpense)=>[...previousExpense,expense]);  //

        const amount = parseFloat(expense.amount);  //
        
        if(expense.type === "Income"){
            setTotalincome((previousTotal)=> previousTotal + amount)  //
            setBalance((previousBalance)=>previousBalance + amount);  //
            console.log(balance);
        }
        else if(expense.type === "Expense"){
            setTotalExpenses((previousExpense)=> previousExpense + amount)//
            setBalance((previousBalance)=> previousBalance - amount)//
        }

        setExpense({
            title:"",
            amount:'',
            type:''   //
        }) 
    }

  const handleDelete = (index)=>{

    
    const expenseToDelete = newexpense[index];         //
    const amount = parseFloat(expenseToDelete.amount);  //
        
        if(expenseToDelete.type === "Income"){
            setTotalincome((previousTotal)=>  previousTotal-amount ) //
            setBalance((previousBalance)=> previousBalance-amount);  //
            console.log(balance);
        }
        else if(expenseToDelete.type === "Expense"){
            setTotalExpenses((previousExpense)=> previousExpense-amount)  //
            setBalance((previousBalance)=>    previousBalance + amount )//
        }
    const newCreatedExpenseArray = newexpense.filter((_,i)=> i !== index);  //
    setNewExpence(newCreatedExpenseArray);
  }   
  return (
    <div className='app'>
            <div className="container">
                <div className="header">
                    <h1>Expense Tracker</h1>
                </div>
                <div className="expenses-total">
                    <h3 className='in'>+{totalincome} <br /><span className='in'>Total Income</span></h3>
                    <h2>{balance} <br /><span>Balance</span></h2>
                    <h3 className='out'>{totalexpenses}<br /><span className='out'>Total Expenses</span></h3>
                </div>

                <div className="expense-details">
                    {newexpense.map((ex, index)=>{
                        const{title,amount,type} = ex;
                        return (
                        <div key={index} className='entered-ex' style={{borderRight: `${type === "Income" ? '4px solid blue': '4px solid rgb(173, 37, 37)'}`}} > 
                                <p>{title}</p>
                                <p style={{color : `${type === "Income" ? 'blue': 'rgb(199, 17, 37)'}`}} >{amount}</p>
                                <p>{type}</p>
                                <span onClick={()=>handleDelete(index)}>X</span>
                        </div>
                        );
                    })}
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder='type your expense/income...'
                        name='title'
                       value={expense.title}
                       onChange={handleOnChange}
                    />
                    <input
                        type="text"
                        className='amount-input'
                        placeholder='Amount'
                        name='amount'
                        value={expense.amount}
                        onChange={handleOnChange}
                    />
                    <select
                        name="type"
                        value={expense.type}
                        onChange={handleOnChange}
                        
                    >
                        <option value="" selected disabled>Select</option>
                        <option value="Expense">Expense</option>
                        <option value="Income">Income</option>
                    </select>
                </div>
                <div className="submit">
                    <input type="button" value="Add"  onClick={handleSubmit}/>
                </div>
            </div>
        </div>
  )
}
  

export default ExpenseTrackingApp
