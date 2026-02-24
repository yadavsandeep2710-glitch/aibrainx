import React from 'react';
import styles from './AuthorBox.module.css';

interface AuthorBoxProps {
    name?: string;
    title?: string;
    bio?: string;
}

const AuthorBox: React.FC<AuthorBoxProps> = ({
    name = "AIBrainX Editorial Team",
    title = "AI Research & Review Team (India)",
    bio = "We test AI tools, prompts, and workflows for students, creators, and businesses in India to ensure they are practical, affordable, and effective for the Indian market."
}) => {
    return (
        <div className={styles.authorBox}>
            <div className={styles.avatar}>
                {name === "AIBrainX Editorial Team" ? "AX" : name.charAt(0)}
            </div>
            <div className={styles.content}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.title}>{title}</p>
                <p className={styles.bio}>{bio}</p>
            </div>
        </div>
    );
};

export default AuthorBox;
