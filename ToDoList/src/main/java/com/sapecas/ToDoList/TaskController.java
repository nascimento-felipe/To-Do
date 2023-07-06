package com.sapecas.ToDoList;

import jakarta.validation.Valid;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/task")
public class TaskController {

    @Autowired
    TaskService taskService;

    @GetMapping
    public ResponseEntity<Page<TaskModel>> getAllTasks(@PageableDefault(page=0, size=5, direction=Sort.Direction.ASC, sort="dueDate") Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(taskService.findAll(pageable));
    }

    @PostMapping
    public ResponseEntity<TaskModel> saveTask(@RequestBody @Valid TaskDTO taskDTO) {
        var newTask = new TaskModel();
        BeanUtils.copyProperties(taskDTO, newTask);
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.save(newTask));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getTask(@PathVariable UUID id) {
        Optional<TaskModel> optionalTask = taskService.getTask(id);
        if (!optionalTask.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(taskService.getTask(id).get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable UUID id) {
        Optional<TaskModel> optionalTask = taskService.getTask(id);
        if (!optionalTask.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
        }
        taskService.delete(optionalTask.get());
        return ResponseEntity.status(HttpStatus.OK).body("Task deleted");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable UUID id, @RequestBody @Valid TaskDTO taskDTO) {
        Optional<TaskModel> task = taskService.getTask(id);
        if (!task.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
        }
        var newTask = new TaskModel();
        BeanUtils.copyProperties(taskDTO, newTask);
        newTask.setId(task.get().getId());
        return ResponseEntity.status(HttpStatus.OK).body(taskService.save(newTask));

    }

}
