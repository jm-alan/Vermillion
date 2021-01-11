'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      hearts: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      reblogs: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isReply: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      replyTo: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts'
        }
      },
      isReblog: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      reblogOf: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};
