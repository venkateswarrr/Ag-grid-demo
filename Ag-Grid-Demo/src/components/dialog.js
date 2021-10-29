import React from 'react';
import {input,Modal,Button} from 'react-bootstrap';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {id,name,email,phone,dob}=data

  return (
    <div>
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"Update user":"Create new user"}</DialogTitle>
        <DialogContent>
         <form>
             <TextField id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="Name" variant="outlined" margin="dense" fullWidth />
             <TextField id="email" value={email} onChange={e=>onChange(e)} placeholder="Enter email" label="Email" variant="outlined" margin="dense" fullWidth />
             <TextField id="phone" value={phone} onChange={e=>onChange(e)} placeholder="Enter phone number" label="Phone Number" variant="outlined" margin="dense" fullWidth />
             <TextField id="dob" value={dob} onChange={e=>onChange(e)} placeholder="Enter Date of birth" label="Date of Birth" variant="outlined" margin="dense" fullWidth />
         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div> */}

<Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <input type="text" value={name} onChange={e=>onChange(e)} placeholder="Enter name"/>
        <input type="email" value={email} onChange={e=>onChange(e)} placeholder="Enter email"/>

        <input type="phone" value={phone} onChange={e=>onChange(e)} placeholder="Enter phone number"/>
        <input type="dob" value={dob} onChange={e=>onChange(e)} placeholder="Enter Date of birth"/>


          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"onClick={()=>handleFormSubmit()} >
          {id?"Update":"Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
</div>
  );
}
