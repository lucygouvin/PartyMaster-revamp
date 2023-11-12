import EasyEdit from 'react-easy-edit';

export default function EventDetails ({title, date, time, location, description, isEditable}){
    return(
    <>
        <h2 className="display-4" >
        <EasyEdit
      type="text"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      value={title}
      saveOnBlur={true}
      allowEdit={isEditable}
      onSave={(value)=>value}
    />
        </h2>
        <p className="text-muted"><small>Hosted by: {"Host Name"}</small></p>
        <div className="time-section">
        <EasyEdit
      type="date"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      value={date}
      saveOnBlur={true}
      allowEdit={isEditable}
      onSave={(value)=>value}
    />
         <EasyEdit
      type="time"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      value={time}
      saveOnBlur={true}
      allowEdit={isEditable}
      onSave={(value)=>value}
    />
        </div>
        <EasyEdit
      type="text"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      saveOnBlur={true}
      value={location}
      allowEdit={isEditable}
      onSave={(value)=>value}
    />
        <EasyEdit
      type="textarea"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      value={description}
      saveOnBlur={true}
      allowEdit={isEditable}
      onSave={(value)=>value}
    />
</>
    )
}