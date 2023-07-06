
package com.sapecas.ToDoList;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<TaskModel, UUID>{

    public List<TaskModel> findByTaskNameContainingIgnoreCase(String taskName);
    public List<TaskModel> findByTaskDescriptionContainingIgnoreCase(String taskName);
    
}
