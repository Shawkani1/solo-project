

function DonorList () {



    const Donors = [
        {id: 1, name: "Abdirahman Mohamed", email: "Abdimo1324@gmail.com", Amount: "$100", Phone: "320-237-3479", Address: "1522 Treo Ave S", Status: true  },
        {id: 2, name: "Mohamed Ali", email: "Abdimo1324556@gmail.com", Amount: "$50", Phone: "311-281-7845", Address: "1533 Treo Ave S", Status: false  }
    ]
    return (
     <>
     <div className="overflow-x-auto mt-9">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody className="hover">
      {
      Donors.map((donor) => (
         <tr key={donor.id}>
         <td>{donor.id}</td>
         <td>{donor.name}</td>
         <td>{donor.email}</td>
         <td>{donor.Phone}</td>
         <td>{donor.Address}</td>
         <td>{donor.Amount}</td>
         <td>
            <button className={`btn rounded-full w-20  ${donor.Status ? `btn-primary` : `btn-outline-primary` } `}>
                {donor.Status ? 'Paid' : 'Not Paid'}
            </button>
         </td>
         <td>
            <button className=" btn btn-secondary">
                Update
            </button>
        </td>
        <td>
        <button className=" btn btn-secondary">
                Delete
            </button>
        </td>
        
         </tr>
      ))}

      
    </tbody>
  </table>
</div>
        </>
    )
}


export default DonorList;