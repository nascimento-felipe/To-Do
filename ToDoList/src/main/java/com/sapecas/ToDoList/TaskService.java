/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.sapecas.ToDoList;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskDAO;

    public Page<TaskModel> findAll(Pageable pageable) {
        return taskDAO.findAll(pageable);
    }
    
    @Transactional
    public TaskModel save(TaskModel newTask) {
        return taskDAO.save(newTask);
    }
    
    public Optional<TaskModel> getTask(UUID id) {
        return taskDAO.findById(id);
    }

    @Transactional
    void delete(TaskModel task) {
        taskDAO.delete(task);
    }

    List<TaskModel> findByName(String taskName) {
        return taskDAO.findByTaskNameContainingIgnoreCase(taskName);
    }

    List<TaskModel> findByDescription(String taskDescription) {
        return taskDAO.findByTaskDescriptionContainingIgnoreCase(taskDescription);
    }

}
