import { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { Task } from '../Task';
import * as S from './styles';
import { toast } from 'react-toastify';

export const CardTask = () => {
  const moths = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUNE',
    'JULY',
    'AUG',
    'SEPT',
    'OCT',
    'NOV',
    'DEC',
  ];
  const weeks = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const week = date.getDay();

  const [tasks, setTasks] = useState([
    {
      title: 'Estudy JavaScript',
      done: false,
    },
    { title: 'Estudy React', done: false },
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');

  function handleStatus(id: number) {
    const newTasks = tasks.map((task, index) => {
      if (index == id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function deleteTask(id: number) {
    const newTasks = tasks.filter((task, index) => index != id);
    setTasks(newTasks);
  }

  function handleInput() {
    setIsVisible(true);
  }
  function addTask(title: string) {
    if (title.trim() != '') {
      const newTasks = [...tasks, { title: title, done: false }];
      setTasks(newTasks);
    } else {
      toast.error('Task is empyt', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2400,
      });
      toast.clearWaitingQueue();
    }
  }
  return (
    <S.Card>
      <S.Container>
        <header>
          <div className="date">
            <p className="day">{day}</p>
            <div>
              <p className="month">{moths[month]}</p>
              <p className="year">{year}</p>
            </div>
          </div>
          <div>
            <p className="week">{weeks[week]}</p>
          </div>
        </header>

        <main>
          {tasks.map((task, index) => (
            <Task
              task={task.title}
              isOk={task.done}
              key={index}
              onChangeStatus={() => handleStatus(index)}
              deleteTask={() => deleteTask(index)}
            />
          ))}
          <Input
            setTitle={setTitle}
            setIsVisible={setIsVisible}
            addTask={addTask}
            title={title}
            isVisible={isVisible}
          />
        </main>
      </S.Container>
      {<Button toggleInput={() => handleInput()} />}
    </S.Card>
  );
};
