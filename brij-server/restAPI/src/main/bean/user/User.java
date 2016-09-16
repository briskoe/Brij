package main.bean.user;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@NamedQueries({ @NamedQuery(name = "User.findsomething", query = "SELECT u FROM User u WHERE u.email = :email"),
		@NamedQuery(name = "User.findAll", query = "FROM User"),
		@NamedQuery(name = "User.findByUserName", query = "FROM User WHERE username = :username"),
		@NamedQuery(name = "User.findUser", query = "FROM User WHERE username = :username AND password = :password")
})
@Table(name = "users")
public class User {


	@Id
	@Column(name = "username", nullable = false, unique = true)
	private String username;
	
	@JsonIgnore
	@Column(name = "password", nullable = false, length = 100)
	private String password;
	
	@Column(name = "email", nullable = false)
	private String email;

	@JsonIgnore
	@Column(name = "enabled")
	private Boolean enabled;

	@Column(name = "firstName", length = 100)
	private String firstName;
	
	@Column(name = "lastName", length = 100)
	private String lastName;
	
	@Column(name = "phoneNumber", length = 100)
	private String phoneNumber;
	
	@Column(name = "address", length = 100)
	private String address;

	@Column(name = "city", length = 100)
	private String city;
	
	@Column(name = "province", length = 100)
	private String province;
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "user" , cascade = CascadeType.ALL, orphanRemoval=true)
	private Set<UserRole> userRole = new HashSet<UserRole>(0);

	// Public methods

	public User() {
	}

	public User(String username) {
		this.username = username;
		this.email = username;
		this.password="";
	}

	public User(String username, String password) {
		this.email = username;
		this.username = username;
		this.password = password;
		this.enabled = true;
	}
	
	public User(String username, String password, String email) {
		this.email = email;
		this.username = username;
		this.password = password;
		this.enabled = true;
	}
	
	public User(String username, String password, String email, Boolean enabled) {
		this.email = email;
		this.username = username;
		this.password = password;
		this.enabled = enabled;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String name) {
		this.username = name;
	}
	
	@JsonIgnore
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	//isEnabled would be the convention
	//But as it is, it needs to be get to be
	// recognized as a getter by the beanutils.
	@JsonIgnore
	public Boolean getEnabled() {
		return enabled;
	}
	@JsonIgnore
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	@JsonIgnore
	public Set<UserRole> getUserRole() {
		return userRole;
	}
	@JsonIgnore
	public void setUserRole(Set<UserRole> userRole) {
		this.userRole = userRole;
	}

	public static List<User> getPriviligedUser(){
		List<User> users = new ArrayList<User>();
		User admin = new User("Admin", "Admin", "Admin", true);
		UserRole userRole = new UserRole(admin, "ROLE_ADMIN");
		admin.getUserRole().add(userRole);

		return users;
	}
}