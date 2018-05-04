package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.JobHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity JobHistory and its DTO JobHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {JobMapper.class, DepartmentMapper.class, EmployeeMapper.class})
public interface JobHistoryMapper extends EntityMapper<JobHistoryDTO, JobHistory> {

    @Mapping(source = "job.id", target = "jobId")
    @Mapping(source = "department.id", target = "departmentId")
    @Mapping(source = "employee.id", target = "employeeId")
    JobHistoryDTO toDto(JobHistory jobHistory);

    @Mapping(source = "jobId", target = "job")
    @Mapping(source = "departmentId", target = "department")
    @Mapping(source = "employeeId", target = "employee")
    JobHistory toEntity(JobHistoryDTO jobHistoryDTO);

    default JobHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        JobHistory jobHistory = new JobHistory();
        jobHistory.setId(id);
        return jobHistory;
    }
}
