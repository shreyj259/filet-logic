import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css'
import SlackLogin from 'react-slack-login'



function App() {
 const [dataObject,setDataObject]=useState([
  {
    condition: [{
      attribute: "",
      filter: "",
      value: "",
      join: "none",
    },
    {
      attribute: "",
      filter: "",
      value: "",
      join: "and",
    }
    ],
    outerJoin: "none"
  }
 ]);

 let data={Id: 'id',
 IsDeleted: 'boolean',
 AccountId: 'reference',
 IsPrivate: 'boolean',
 Name: 'string',
 Description: 'textarea',
 StageName: 'picklist',
 Amount: 'currency',
 Probability: 'percent',
 ExpectedRevenue: 'currency',
 TotalOpportunityQuantity: 'double',
 CloseDate: 'date',
 Type: 'picklist',
 NextStep: 'string',
 LeadSource: 'picklist',
 IsClosed: 'boolean',
 IsWon: 'boolean',
 ForecastCategory: 'picklist',
 ForecastCategoryName: 'picklist',
 CampaignId: 'reference',
 HasOpportunityLineItem: 'boolean',
 Pricebook2Id: 'reference',
 OwnerId: 'reference',
 CreatedDate: 'datetime',
 CreatedById: 'reference',
 LastModifiedDate: 'datetime',
 LastModifiedById: 'reference',
 SystemModstamp: 'datetime',
 LastActivityDate: 'date',
 LastStageChangeDate: 'datetime',
 FiscalQuarter: 'int',
 FiscalYear: 'int',
 Fiscal: 'string',
 ContactId: 'reference',
 LastViewedDate: 'datetime',
 LastReferencedDate: 'datetime',
 HasOpenActivity: 'boolean',
 HasOverdueTask: 'boolean',
 LastAmountChangedHistoryId: 'reference',
 LastCloseDateChangedHistoryId: 'reference',
 DeliveryInstallationStatus__c: 'picklist',
 TrackingNumber__c: 'string',
 OrderNumber__c: 'string',
 CurrentGenerators__c: 'string',
 MainCompetitors__c: 'string',
 Average_ARR__c: 'currency'}

 const picklist={StageName: ['Closed Won',
 'Qualification',
 'Needs Analysis',
 'Value Proposition',
 'Negotiation/Review',
 'Closed Lost',
 'Perception Analysis',
 'Id. Decision Makers',
 'Proposal/Price Quote',
 'Prospecting'],
 Type: ['New Customer',
 'Existing Customer - Downgrade',
 'Existing Customer - Replacement',
 'Existing Customer - Upgrade',
 'None'],
 LeadSource: ['None',
 'Purchased List',
 'Trade Show',
 'Partner',
 'Employee Referral',
 'Word of mouth',
 'Public Relations',
 'Phone Inquiry',
 'External Referral',
 'Web']}

 const keys=Object.keys(data);



 const handleAddCondition=(index)=>{
  let tempdata=[...dataObject[index].condition];
  tempdata.push({
    attribute: "",
    filter: "",
    value: "",
    join: "and",
  });
  let temp=[...dataObject];
  temp[index].condition=tempdata;
  setDataObject(temp);
 }

 const handleAttribute=(e,index,outerIndex)=>{
  let temp=[...dataObject];
  let tempdata=[...dataObject[outerIndex].condition];
  tempdata[index].attribute=e.target.value;
  temp[outerIndex].condition=tempdata;
  setDataObject(temp);
 }

 const picklistHAndler=(e,index,outerIndex)=>{
  let temp=[...dataObject];
  let tempdata=[...dataObject[outerIndex].condition];
  tempdata[index].value=e.target.value;
  temp[outerIndex].condition=tempdata;
  setDataObject(temp);
 }

 const handleAddConditionGroup=()=>{
  let temp=[...dataObject];
  temp.push({
    condition: [{
      attribute: "type",
      filter: "",
      value: "",
      join: "none",
    },
    {
      attribute: "",
      filter: "",
      value: "",
      join: "and",
    }
    ],
    outerJoin: "none"
  })
  setDataObject(temp);
 }

 const handleJoinChange=(e,index,outerIndex)=>{ 
  let temp=[...dataObject];
  let tempdata=[...dataObject[outerIndex].condition];
  tempdata[index].join=e.target.value;
  temp[outerIndex].condition=tempdata;
  setDataObject(temp);
 }

 const output=dataObject.map(
  (outerItem,outerIndex)=>{
    let innerData=outerItem.condition.map((item,index,arr)=>{
        let box1;
        if(index==0)
          box1=<div>Where : </div>
          else if(index==1)
          box1=<div><select onChange={(e)=>handleJoinChange(e,index,outerIndex)}><option value="and">and</option><option value="or">or</option></select></div>
            else if(index>1)
          box1=<div>{arr[1].join}</div>
          let box3;
          if(data[item.attribute]=='boolean')
          box3=<div><select name="" id=""><option value="true">true</option><option value="false">false</option></select></div>
          else if(data[item.attribute]=='picklist')
          box3=<div><select onChange={(e)=>picklistHAndler(e,index,outerIndex)} name="" id="">{picklist[item.attribute].map(pick=>{return <option value={pick}>{pick}</option>})}</select></div>
          else
          box3=<div><input type="text" /></div>
        return (
          <div className="condition">
            {box1}
            <div><select onChange={(e)=>handleAttribute(e,index,outerIndex)} name="attribute" id="">{keys.map(key=><option value={key}>{key}</option>)}</select></div>
            <div><select name="filter" id=""><option>1</option><option>2</option></select></div>
            <div>{box3}</div>
          </div>
        )
       })

    if(outerIndex==0)
    return <div>
      <div>Where</div><div>
        {innerData}
      </div>
    </div>
    else if(outerIndex==1){
      return <div className='condition-box'>
      <div><select><option value="and">and</option><option value="or">or</option></select></div><div>
        {innerData}
      </div>
      <div><button onClick={()=>handleAddCondition(outerIndex)}>add condition</button></div>
    </div>
    }
    else if(outerIndex>1)
    return <div className='condition-box'>
    <div>{dataObject[1].outerJoin}</div><div>
      {innerData}
    </div>
    <div><button onClick={()=>handleAddCondition(outerIndex)}>add condition</button></div>
  </div>
  }
 )
 
 


 return (
    <div className="App">
      <div className="box">
        {output}
        <div className="btn-container">
          <button onClick={()=>handleAddCondition(0)}>add condition</button>
          <button onClick={handleAddConditionGroup}>add condition group</button>
        </div>
      </div>
      <div><button onClick={()=>{console.log(dataObject)}}>>send request</button></div>
    </div> 


  );
}

export default App;
