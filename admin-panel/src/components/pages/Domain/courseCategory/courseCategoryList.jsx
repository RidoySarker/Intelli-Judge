const courseCategoryList = (props) => {
    const {courseCategories,editCategory, deleteCategory} = props;

  return (
      <>
          <div className="card">
              <div className="card-header">
                  <h4 className="card-title">Course Categories</h4>
              </div>
              <div className="card-body">
                  <div className="table-responsive">
                      <table className="table mb-0 table-centered">
                          <thead>
                          <tr>
                              <th>Sl No</th>
                              <th>Course Category</th>
                              <th>Status</th>
                              <th className="text-end">Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          {courseCategories && courseCategories.map((category,index) =>{
                              return (<tr key={index}>
                                  <td>{ index + 1 }</td>
                                  <td>{ category.name }</td>
                                  <td>{ category.status == 1 ? 'Active' : 'In Active' } </td>
                                  <td className="text-end">
                                      <button onClick={() => editCategory(category.id)} className="btn btn-de-dashed-info">
                                          <i className="fa fa-edit"></i>
                                      </button>

                                      <button className="btn btn-de-dashed-danger" onClick={() => deleteCategory(category.id)}>
                                          <i className="fa fa-times"></i>
                                      </button>

                                  </td>
                              </tr>
                              );
                          })}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </>
  );
}

export default courseCategoryList;