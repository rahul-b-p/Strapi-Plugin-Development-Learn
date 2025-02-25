import React, { useEffect, useState } from 'react';
import {
  Main,
  Table,
  Thead,
  Tbody,
  TFooter,
  Tr,
  Td,
  Th,
  Typography,
  Checkbox,
  Divider,
  Flex,
  Modal,
  Button,
  Field,
} from '@strapi/design-system';
import { Database, Pencil, Trash } from '@strapi/icons';
import todoRequests from '../api/todo';

function SecondPage() {
  const [todo, setTodo] = useState({
    title: '',
    description: '',
  });
  const [todoData, setTodoData]: [{ id: string; title: string; description: string }[], any] =
    useState([]);
  async function fetchTodoData() {
    const todo = await todoRequests.getAllTodos();
    setTodoData(todo);
  }
  async function addTodo(data: { title: string; description: string }) {
    setTodoData([...todoData, { ...data, id: crypto.randomUUID() }]);
    setTodo({ title: '', description: '' });
  }

  useEffect(() => {
    fetchTodoData();
  }, []);

  return (
    <Main>
      <Flex
        marginTop="50px"
        marginLeft="20px"
        gap={{
          initial: 1,
          medium: 4,
          large: 8,
        }}
        direction={{
          initial: 'column',
          medium: 'row',
        }}
        alignItems={{
          initial: 'center',
          medium: 'flex-start',
        }}
      >
        <Modal.Root>
          <Modal.Trigger>
            <Button>Add Todo</Button>
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Add to release</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Field.Root name="title" required>
                <Field.Label>Title</Field.Label>
                <Field.Input
                  value={todo.title}
                  onChange={(e: any) => setTodo({ ...todo, title: e.target.value })}
                />
              </Field.Root>
              <Field.Root name="description" required>
                <Field.Label>Description</Field.Label>
                <Field.Input
                  value={todo.description}
                  onChange={(e: any) => setTodo({ ...todo, description: e.target.value })}
                />
              </Field.Root>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close>
                <Button variant="tertiary">Cancel</Button>
              </Modal.Close>
              <Modal.Close>
                <Button onClick={() => addTodo(todo)}>Add</Button>
              </Modal.Close>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>
      </Flex>
      <Divider marginTop="50px" marginBottom="50px" />
      <Table
        colCount={1}
        rowCount={4}
        footer={<TFooter icon={<Database />}>Total Count = {todoData.length}</TFooter>}
      >
        <Thead>
          <Tr>
            <Th>
              <Checkbox aria-label="Select all entries" />
            </Th>
            <Th>
              <Typography variant="sigma">ID</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Title</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Description</Typography>
            </Th>
            <Th>
              <Typography varient="sigma">Action</Typography>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {todoData.map((entry) => (
            <Tr key={entry.id}>
              <Td></Td>
              <Td>
                <Typography textColor="neutral800">{entry.id}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.title}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.description}</Typography>
              </Td>
              <Td>
                <Trash /> <Pencil />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Main>
  );
}

export default SecondPage;
