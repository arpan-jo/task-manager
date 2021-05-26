import React, { useContext, useEffect, useState } from 'react';
import {
   Button,
   Container,
   Form,
   Grid,
   Input,
   Segment,
   Header,
   Table,
   TableCell,
   Icon,
} from 'semantic-ui-react';
import { UserContext } from '../App';
import firebase from './firebaseConfig';

const TaskManager = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);

   console.log(loggedInUser);
   const [name, setName] = useState('');
   const [allTask, setAllTask] = useState([]);
   const [updateName, setUpdateName] = useState('');
   const [taskId, setTaskId] = useState('');

   useEffect(() => {
      const firestore = firebase.database().ref('/task');
      firestore.on('value', res => {
         const data = res.val();
         let info = [];
         for (let id in data) {
            info.push({
               id: id,
               name: data[id].name,
            });
         }
         setAllTask(info);
      });
   }, []);

   const handleAddTask = () => {
      const firestore = firebase.database().ref('/task');
      let data = {
         name: name,
      };
      firestore.push(data);
      setName('');
   };

   const handleUpdateTask = () => {
      const firestore = firebase.database().ref('/task').child(taskId);
      firestore.update({
         name: updateName,
      });
      setUpdateName('');
   };
   const handleUpdate = data => {
      setUpdateName(data.name);
      setTaskId(data.id);
   };

   const handleDelete = id => {
      const firestore = firebase.database().ref('/task').child(id);
      firestore.remove();
   };

   return (
      <div style={{ marginTop: '50px' }}>
         <Container>
            <h1 style={{ fontSize: '40px' }}>Task Manager</h1>
            <h3>
               The user:{' '}
               <span style={{ color: 'goldenrod', fontWeight: 'bolder' }}>
                  {loggedInUser && loggedInUser.displayName}
               </span>
            </h3>
            <Grid>
               <Grid.Row columns="2">
                  <Grid.Column>
                     <h3> Add Task</h3>
                     <Segment padded="very">
                        <Form>
                           <Form.Field>
                              <label>Task</label>
                              <Input
                                 onChange={e => setName(e.target.value)}
                                 placeholder="What do you need to do?"
                                 name="name"
                                 value={name}
                              />
                           </Form.Field>
                           <Form.Field>
                              <Button onClick={handleAddTask} positive>
                                 Add Task
                              </Button>
                           </Form.Field>
                        </Form>
                     </Segment>
                  </Grid.Column>
                  <Grid.Column>
                     <h3> Edit Task</h3>
                     <Segment padded="very">
                        <Form>
                           <Form.Field>
                              <labeL>Task</labeL>
                              <Input
                                 onChange={e => setUpdateName(e.target.value)}
                                 placeholder="update?"
                                 name="name"
                                 value={updateName}
                                 focus
                              />
                           </Form.Field>
                           <Form.Field>
                              <Button onClick={handleUpdateTask} primary>
                                 <Icon name="edit"></Icon>
                                 Update Task
                              </Button>
                           </Form.Field>
                        </Form>
                     </Segment>
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row columns="1">
                  <Grid.Column>
                     {allTask.length === 0 ? (
                        <Segment padded="very">
                           <Header textAlign="center">
                              oops! No data available. Please entar some data.
                           </Header>
                        </Segment>
                     ) : (
                        <Segment padded="very">
                           <Table celled fixed singleLine>
                              <Table.Header>
                                 <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                 </Table.Row>
                              </Table.Header>
                              {allTask.map((task, index) => {
                                 return (
                                    <Table.Body key={index}>
                                       <TableCell>{task.name}</TableCell>
                                       <TableCell textAlign="center">
                                          <Button
                                             primary
                                             onClick={() => {
                                                handleUpdate(task);
                                             }}
                                          >
                                             <Icon name="edit"></Icon>
                                             Update
                                          </Button>
                                          <Button
                                             color="red"
                                             onClick={() =>
                                                handleDelete(task.id)
                                             }
                                          >
                                             <Icon name="delete"></Icon> Delete
                                          </Button>
                                       </TableCell>
                                    </Table.Body>
                                 );
                              })}
                           </Table>
                        </Segment>
                     )}
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </Container>
      </div>
   );
};

export default TaskManager;
