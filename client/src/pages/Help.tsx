import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { Mail, Phone, FileText, HelpCircle, BookOpen, AlertCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Help() {
  const faqCategories = [
    {
      category: 'Регистрация и аккаунт',
      items: [
        {
          question: 'Как зарегистрироваться на платформе?',
          answer:
            'Для регистрации на платформе нажмите кнопку "Регистрация" в правом верхнем углу главной страницы. Заполните форму, указав свои данные, и подтвердите адрес электронной почты.',
        },
        {
          question: 'Как подтвердить свою личность или компанию?',
          answer:
            'Для подтверждения личности загрузите фотографию паспорта в разделе профиля. Для подтверждения компании необходимо загрузить регистрационные документы. После проверки модераторами вы получите статус "Проверенный пользователь".',
        },
        {
          question: 'Забыл пароль, что делать?',
          answer:
            'На странице входа нажмите на ссылку "Забыли пароль?". Введите адрес электронной почты, указанный при регистрации, и мы отправим вам инструкции по восстановлению пароля.',
        },
      ],
    },
    {
      category: 'Тендеры',
      items: [
        {
          question: 'Как создать тендер?',
          answer:
            'Для создания тендера перейдите в раздел "Тендеры" и нажмите кнопку "Создать тендер". Заполните все необходимые поля, указав детальное описание работ, бюджет, сроки и требования к исполнителю.',
        },
        {
          question: 'Как выбрать исполнителя для своего тендера?',
          answer:
            'После получения заявок на ваш тендер вы можете сравнить предложения, учитывая стоимость, сроки, рейтинг и отзывы о подрядчиках. Для выбора исполнителя нажмите "Принять заявку" на странице тендера.',
        },
        {
          question: 'Можно ли отредактировать или удалить тендер?',
          answer:
            'Да, вы можете редактировать тендер, пока он находится в статусе "Актуален" и на него не поступили заявки. Удалить тендер можно также до начала работ по нему.',
        },
      ],
    },
    {
      category: 'Маркетплейс',
      items: [
        {
          question: 'Как разместить объявление о продаже или аренде?',
          answer:
            'Для размещения объявления перейдите в раздел "Маркетплейс" и нажмите "Разместить объявление". Выберите тип объявления (продажа/аренда), категорию товара, заполните описание, укажите цену и загрузите фотографии.',
        },
        {
          question: 'Как связаться с продавцом?',
          answer:
            'На странице объявления нажмите кнопку "Написать продавцу". Вы перейдете в чат, где сможете обсудить все детали и договориться о встрече или доставке.',
        },
        {
          question: 'Как продлить срок действия объявления?',
          answer:
            'Объявления действуют 30 дней. За 3 дня до окончания срока вы получите уведомление. Чтобы продлить объявление, перейдите в "Мои объявления" в личном кабинете и нажмите "Продлить".',
        },
      ],
    },
    {
      category: 'Оплата и финансы',
      items: [
        {
          question: 'Как работает система безопасных платежей?',
          answer:
            'При использовании безопасного платежа заказчик переводит средства на эскроу-счет платформы. Исполнитель получает оплату только после того, как заказчик подтвердит успешное выполнение работ или получение товара.',
        },
        {
          question: 'Какие комиссии взимает платформа?',
          answer:
            'Размещение объявлений и тендеров бесплатно. Комиссия в размере 5% взимается только при использовании системы безопасных платежей. Эта комиссия покрывает расходы на обработку платежей и обеспечение безопасности сделок.',
        },
        {
          question: 'Как вернуть деньги при отмене сделки?',
          answer:
            'Если сделка отменяется по обоюдному согласию сторон до начала работ, средства возвращаются заказчику в полном объеме. В случае спорных ситуаций решение принимается службой поддержки после рассмотрения всех обстоятельств.',
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Помощь и поддержка | СтройТендер</title>
        <meta
          name="description"
          content="Центр поддержки СтройТендер. Ответы на часто задаваемые вопросы, инструкции по работе с платформой и контактная информация."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Центр поддержки</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Найдите ответы на часто задаваемые вопросы или свяжитесь с нашей
            службой поддержки, если вам нужна дополнительная помощь
          </p>
        </div>

        {/* Support options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-50 rounded-full text-primary">
                <MessageCircle className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Чат поддержки</h2>
            <p className="text-gray-600 mb-4">
              Получите быструю помощь от наших специалистов через чат
            </p>
            <Button className="w-full">Начать чат</Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-50 rounded-full text-primary">
                <Mail className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Электронная почта</h2>
            <p className="text-gray-600 mb-4">
              Напишите нам на почту, мы ответим в течение одного рабочего дня
            </p>
            <Button className="w-full" variant="outline">
              support@stroytender.ru
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-50 rounded-full text-primary">
                <Phone className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Телефон поддержки</h2>
            <p className="text-gray-600 mb-4">
              Позвоните нам по телефону в рабочие дни с 9:00 до 18:00
            </p>
            <Button className="w-full" variant="outline">
              8 (800) 123-45-67
            </Button>
          </div>
        </div>

        {/* Resource links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/how-it-works">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-50 rounded-full text-primary mr-4">
                <HelpCircle className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Как это работает</h2>
                <p className="text-gray-600">
                  Подробное руководство по использованию платформы
                </p>
              </div>
            </div>
          </Link>

          <Link href="#">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-50 rounded-full text-primary mr-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Правила пользования</h2>
                <p className="text-gray-600">
                  Правила и политики платформы
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* FAQ section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Часто задаваемые вопросы</h2>

          {faqCategories.map((category, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-lg font-medium text-primary mb-4">
                {category.category}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, itemIdx) => (
                  <AccordionItem key={itemIdx} value={`item-${idx}-${itemIdx}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Не нашли ответа на свой вопрос?</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <p className="text-gray-600 mb-4">
                Заполните форму, и наши специалисты свяжутся с вами в ближайшее время.
                Мы стараемся отвечать на все запросы в течение 24 часов.
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>support@stroytender.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>8 (800) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <Link href="#" className="text-primary hover:underline">
                    Правила обработки запросов
                  </Link>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <p>Время работы службы поддержки:</p>
                <p>Понедельник-пятница: 9:00 - 18:00</p>
                <p>Суббота-воскресенье: выходной</p>
              </div>
            </div>

            <div className="md:w-1/2">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="example@mail.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Тема обращения
                  </label>
                  <select
                    id="topic"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Выберите тему</option>
                    <option value="account">Проблемы с аккаунтом</option>
                    <option value="tenders">Вопросы по тендерам</option>
                    <option value="marketplace">Вопросы по маркетплейсу</option>
                    <option value="payments">Платежи и финансы</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Опишите вашу проблему или вопрос..."
                  ></textarea>
                </div>
                <Button type="submit" className="w-full">
                  Отправить сообщение
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
