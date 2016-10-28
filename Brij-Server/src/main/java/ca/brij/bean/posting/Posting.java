package ca.brij.bean.posting;
import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ca.brij.bean.user.User;


@Entity
@NamedQueries({ @NamedQuery(name = "Posting.getAllPostings", query = "from Posting ORDER BY creationDate DESC"),
		@NamedQuery(name = "Posting.getPostsByLocation", query="SELECT Posting FROM Posting Posting  WHERE ( 6371 * acos( cos( radians(:latitude) ) * cos( radians( user.latitude ) ) * cos( radians( user.longitude ) - radians(:longitude) ) + sin( radians(:latitude) ) * sin( radians( user.latitude ) ) ) ) < :distance"),
		@NamedQuery(name = "Posting.getPostingById", query = "from Posting where id = :id"),
		@NamedQuery(name = "Posting.getPostingsByUserID", query = "from Posting where user.username = :userID ORDER BY creationDate DESC"),
		@NamedQuery(name = "Posting.getCountOfAll", query = "SELECT count(*) from Posting ORDER BY creationDate DESC"),
		@NamedQuery(name = "Posting.getCountOfUser", query = "SELECT count(*) from Posting  where user.username = :userID")})
@Table(name = "posting", indexes = { 
		@Index(name = "posting_nameInd", columnList = "title") })
@DynamicUpdate
public class Posting implements Serializable{

	private static final long serialVersionUID = 8816634543519363815L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Integer id;

	@Column(name = "title", nullable = false)
	private String title;

	// get this from the form (dropdown has values);
	@Column(name = "servID", nullable = false)
	private Integer servID;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "username")
	private User user;

	@Column(name = "details", columnDefinition = "TEXT")
	private String details;

	@Column(name = "isPost")
	private Boolean isPost;
	
	@Column(name = "creationDate")
	private Calendar creationDate;
	
	public Posting() {
	}

	public Posting(Integer id, String name) {
		this.id = id;
		this.title = name;
		this.creationDate = Calendar.getInstance();
	}

	public Posting(Integer id, String title, User user, Integer servID) {
		this.id = id;
		this.title = title;
		this.user = user;
		this.servID = servID;
		this.creationDate = Calendar.getInstance();
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getServID() {
		return servID;
	}

	public void setServID(Integer servID) {
		this.servID = servID;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public Boolean getIsPost() {
		return isPost;
	}

	public void setIsPost(Boolean isPost) {
		this.isPost = isPost;
	}

	public Calendar getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Calendar creationDate) {
		this.creationDate = creationDate;
	}
	
	

}