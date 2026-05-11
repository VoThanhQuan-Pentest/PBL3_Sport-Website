package com.flarefitness.backend.repository;

import com.flarefitness.backend.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, String> {

    List<User> findByDeletedFalseOrderByHoTenAsc();

    @Query("select u from User u where lower(u.username) = lower(:username) and u.deleted = false")
    Optional<User> findByUsernameIgnoreCase(@Param("username") String username);

    @Query("select u from User u where lower(u.email) = lower(:email) and u.deleted = false")
    Optional<User> findByEmailIgnoreCase(@Param("email") String email);

    @Query("select count(u) > 0 from User u where lower(u.username) = lower(:username) and u.deleted = false")
    boolean existsByUsernameIgnoreCase(@Param("username") String username);

    @Query("select count(u) > 0 from User u where lower(u.email) = lower(:email) and u.deleted = false")
    boolean existsByEmailIgnoreCase(@Param("email") String email);

    @Query("select count(u) > 0 from User u where lower(u.username) = lower(:username) and u.id <> :id and u.deleted = false")
    boolean existsByUsernameIgnoreCaseAndIdNot(@Param("username") String username, @Param("id") String id);

    @Query("select count(u) > 0 from User u where lower(u.email) = lower(:email) and u.id <> :id and u.deleted = false")
    boolean existsByEmailIgnoreCaseAndIdNot(@Param("email") String email, @Param("id") String id);

    @Query("select u from User u where u.id = :id and u.deleted = false")
    Optional<User> findActiveById(@Param("id") String id);

    @Query("select u.id from User u where u.id like concat(:prefix, '%')")
    List<String> findIdsByPrefix(@Param("prefix") String prefix);
}
